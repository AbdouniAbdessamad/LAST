<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LowQuantity;

class LowQuantityController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $lowQuantities = LowQuantity::all();
        return response()->json(['lowQuantities' => $lowQuantities], 200);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\LowQuantity  $lowquantity
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(LowQuantity $lowquantity)
    {
        $lowquantity->delete();
        return response()->json(['message' => 'Low quantity item deleted successfully'], 200);
    }
}
