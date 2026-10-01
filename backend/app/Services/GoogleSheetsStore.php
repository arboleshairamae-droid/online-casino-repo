<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use RuntimeException;

class GoogleSheetsStore
{
    public function rows(string $tab): array
    {
        return $this->send('rows', ['tab' => $tab])['rows'] ?? [];
    }

    public function append(string $tab, array $row): void
    {
        $this->send('append', ['tab' => $tab, 'row' => $row]);
    }

    public function update(string $tab, int $rowNumber, array $row): void
    {
        $this->send('update', [
            'tab' => $tab,
            'row_number' => $rowNumber,
            'row' => $row,
        ]);
    }

    private function send(string $action, array $parameters): array
    {
        $url = config('services.google_sheets.web_app_url');
        $apiKey = config('services.google_sheets.api_key');

        if (! $url || ! $apiKey) {
            throw new RuntimeException('Google Apps Script URL or API key is not configured.');
        }

        $response = Http::acceptJson()
            ->timeout(30)
            ->post($url, [
                ...$parameters,
                'action' => $action,
                'api_key' => $apiKey,
            ])
            ->throw();

        $result = $response->json();

        if (! is_array($result) || ($result['ok'] ?? false) !== true) {
            throw new RuntimeException($result['error'] ?? 'Google Apps Script returned an invalid response.');
        }

        return $result;
    }
}
