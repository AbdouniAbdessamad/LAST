<?php
namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::with('category', 'lastEditor')->get();
        return response()->json(['articles' => $articles], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date',
            'bon_commande' => 'required|max:225|min:1',
            'supplier_id' => 'required|max:225',
            'ref' => 'required|max:225|min:1',
            'name' => 'required|max:225|min:1',
            'quantity' => 'required|numeric|min:0',
            'category_id' => '',
            'status' => '',
        ]);

        $article = new Article($request->all());
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
        $request->validate([
            'date' => 'required|date',
            'bon_commande' => 'required|max:225|min:1',
            'supplier_id' => 'required|max:225',
            'ref' => 'required|max:225|min:1',
            'name' => 'required|max:225|min:1',
            'quantity' => 'required|numeric|min:0',
            'category_id' => '',
            'status' => '',
        ]);

        $article->update($request->all());

        return response()->json(['article' => $article], 200);
    }

    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(['message' => 'Article deleted successfully'], 200);
    }
}
