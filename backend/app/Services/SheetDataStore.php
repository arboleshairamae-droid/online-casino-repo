<?php

namespace App\Services;

use Illuminate\Support\Str;

class SheetDataStore
{
    public function users(): array
    {
        return app(GoogleSheetsStore::class)->rows('Users');
    }

    public function userByEmail(string $email): ?array
    {
        foreach ($this->users() as $user) {
            if (strcasecmp($user['email'] ?? '', $email) === 0) {
                return $user;
            }
        }

        return null;
    }

    public function userById(string $id): ?array
    {
        foreach ($this->users() as $user) {
            if (($user['id'] ?? '') === $id) {
                return $user;
            }
        }

        return null;
    }

    public function createUser(array $data): array
    {
        $user = [
            'id' => (string) Str::uuid(),
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'balance' => number_format((float) ($data['balance'] ?? 1000), 2, '.', ''),
            'created_at' => now()->toISOString(),
        ];

        app(GoogleSheetsStore::class)->append('Users', $user);

        return $user;
    }

    public function createToken(string $userId): string
    {
        $token = Str::random(64);

        app(GoogleSheetsStore::class)->append('Tokens', [
            'token_hash' => hash('sha256', $token),
            'user_id' => $userId,
            'created_at' => now()->toISOString(),
        ]);

        return $token;
    }

    public function userForToken(string $token): ?array
    {
        $tokenHash = hash('sha256', $token);

        foreach (app(GoogleSheetsStore::class)->rows('Tokens') as $storedToken) {
            if (hash_equals($storedToken['token_hash'] ?? '', $tokenHash)) {
                return $this->userById($storedToken['user_id'] ?? '');
            }
        }

        return null;
    }

    public function revokeToken(string $token): void
    {
        $tokenHash = hash('sha256', $token);

        foreach (app(GoogleSheetsStore::class)->rows('Tokens') as $storedToken) {
            if (hash_equals($storedToken['token_hash'] ?? '', $tokenHash)) {
                app(GoogleSheetsStore::class)->update('Tokens', $storedToken['_row'], [
                    'token_hash' => '',
                    'user_id' => '',
                    'created_at' => '',
                ]);

                return;
            }
        }
    }

    public function activitiesForUser(string $userId): array
    {
        return collect(app(GoogleSheetsStore::class)->rows('Activities'))
            ->filter(fn (array $activity) => ($activity['user_id'] ?? '') === $userId)
            ->sortByDesc('created_at')
            ->take(10)
            ->map(function (array $activity): array {
                unset($activity['_row']);

                return $activity;
            })
            ->values()
            ->all();
    }
}