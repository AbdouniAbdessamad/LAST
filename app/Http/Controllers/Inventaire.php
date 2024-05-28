<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class Inventaire extends Controller
{
    public function show(Request $req)
    {
        $date1=$req->date1;
        $date2=$req->date2;
        $articles=\App\Models\Article::whereBetween('date', [$date1, $date2])->orderBy('date', 'desc')->get();
        return response()->json(['articles' => $articles], 200);
    }
}
