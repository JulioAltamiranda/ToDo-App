<?php

namespace App\Http\Controllers;

use App\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TodoController extends Controller
{
    public function index()
    {
        return view('todo');
    }
    public function todoList(Request $request)
    {
        //pending or completed
        if ($request->status != null) {
            return Todo::where('status', $request->status)->paginate(3);
        }
        //all todo
        return Todo::paginate(3);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);
        $todo = Todo::create($data);
        return $todo;
    }
    public function update($id, Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);
        $todo = Todo::findOrFail($id);
        $todo->name = $request->name;
        $todo->description = $request->description;
        $todo->save();
        return $todo;
    }
    public function changeStatus(Todo $todo)
    {
        $todo->status = !$todo->status;
        $todo->save();
        return $todo;
    }
    public function destroy(Todo $todo)
    {
        $todo->delete();
    }
}
