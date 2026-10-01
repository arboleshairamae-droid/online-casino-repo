<?php

namespace App\Http\Controllers;

use App\Services\SheetDataStore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request, SheetDataStore $store)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                function (string $attribute, mixed $value, \Closure $fail) use ($store): void {
                    if ($store->userByEmail($value)) {
                        $fail('The email has already been taken.');
                    }
                },
            ],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Please complete all required fields.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = $store->createUser([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'balance' => 1000.00,
        ]);

        return response()->json([
            'message' => 'Registration successful.',
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'balance' => $user['balance'],
            ],
        ], 201);
    }

    public function login(Request $request, SheetDataStore $store)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Invalid email or password.',
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = $store->userByEmail($request->email);

        if (! $user || ! Hash::check($request->password, $user['password'])) {
            throw ValidationException::withMessages([
                'email' => ['Invalid email or password.'],
            ]);
        }

        $token = $store->createToken($user['id']);

        return response()->json([
            'message' => 'Login successful.',
            'token' => $token,
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email'],
                'balance' => $user['balance'],
            ],
        ]);
    }

    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'balance' => $user->balance,
            ],
        ]);
    }

    public function logout(Request $request, SheetDataStore $store)
    {
        $store->revokeToken($request->attributes->get('sheets_access_token'));

        return response()->json([
            'message' => 'Logout successful.',
        ]);
    }
}
