<?php
namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    public function index()
{
    $articles = Article::paginate(10); // Adjust the number to your preference
    return response()->json(['articles' => $articles], 200);
}

    public function store(Request $request)
    {
        $validatedData=$request->validate([
            'date' => 'required|date',
            'bon_commande' => 'required|max:225|min:1',
            'supplier_id' => 'required|max:225',
            'ref' => 'required|max:225|min:1',
            'name' => 'required|max:225|min:1',
            'quantity' => 'required|numeric|min:0',
            'category_id' => 'required|numeric',
            'status' => 'string',
        ]);

        $article = new Article($validatedData);
        $article->last_editor_id = Auth::id();
        $article->save();

        return response()->json(['article' => $article], 201);
    }

    public function show(Article $article)
    {
        return response()->json(['article' => $article], 200);
    }

    public function update(Request $request, Article $article)
    {
        $validatedData=$request->validate([
            'date' => 'required|date',
            'bon_commande' => 'required|max:225|min:1',
            'supplier_id' => 'required|max:225',
            'ref' => 'required|max:225|min:1',
            'name' => 'required|max:225|min:1',
            'quantity' => 'required|numeric|min:0',
            'category_id' => 'required',
            'status' => 'string',
            'last_editor_id' => 'numeric',
        ]);

        $article->update($validatedData);

        return response()->json(['article' => $article], 200);
    }

    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(['message' => 'Article deleted successfully'], 200);
    }
}
