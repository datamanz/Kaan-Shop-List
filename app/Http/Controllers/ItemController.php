<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;

class ItemController extends Controller
{
    //
    public function index()
    {
        return Item::all();
    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required']);
        $item = Item::create(['name' => $request->name]);
        return response()->json($item, 201);
    }

    public function destroy($id)
    {
        Item::destroy($id);
        return response()->json(['message' => 'Item deleted'], 200);
    }
}
