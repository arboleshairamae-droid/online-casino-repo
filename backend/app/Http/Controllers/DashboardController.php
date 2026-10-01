<?php

namespace App\Http\Controllers;

use App\Services\SheetDataStore;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request, SheetDataStore $store)
    {
        $user = $request->user();
        $activities = $store->activitiesForUser($user->id);

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'balance' => $user->balance,
            ],
            'activities' => $activities,
        ]);
    }

    public function profile(Request $request)
    {
        return response()->json([
            'user' => [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'balance' => $request->user()->balance,
                'created_at' => $request->user()->created_at,
            ],
        ]);
    }
}
