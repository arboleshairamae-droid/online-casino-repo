<?php

namespace App\Http\Middleware;

use App\Services\SheetDataStore;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthenticateWithSheets
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (! $token || ! ($user = app(SheetDataStore::class)->userForToken($token))) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $request->attributes->set('sheets_access_token', $token);
        $request->setUserResolver(fn () => (object) $user);

        return $next($request);
    }
}