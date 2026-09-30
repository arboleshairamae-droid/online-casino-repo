<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $activities = Activity::where('user_id', $request->user()->id)
            ->latest()
            ->limit(10)
            ->get();

        return response()->json([
            'user' => [
                'id' => $request->user()->id,
                'name' => $request->user()->name,
                'email' => $request->user()->email,
                'balance' => $request->user()->balance,
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
