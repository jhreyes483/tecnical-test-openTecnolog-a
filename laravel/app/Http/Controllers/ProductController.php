<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductController extends Controller
{

    public function index(request $request)
    {
        $output['status'] = true;
        $output['code']  = 200;
        $output['msg'] = 'Product List';
        try {
            //$products = Product::with('CreatedBy')->with('UpdatedBy');
            $products = Product::with([
                'CreatedBy' => function ($query) {
                    $query->select('id', 'name');
                },
                'UpdatedBy' => function ($query) {
                    $query->select('id', 'name');
                }
            ]);
            $page = $request->input('page', 1);
            $q    = $request->input('q');
            $u    = $request->input('u');

            if ($q) {
                $products = $products->where(function ($query) use ($q) {
                    $query->where('name', 'LIKE', '%' . $q . '%');
                });
            }
            if ($u) {
                $products = $products->where(function ($query) use ($u) {
                    $query->where('user_creator', 'id', $u);
                });
            }
            $products = $products->orderBy('id', 'DESC');
            $output['products'] = $products->paginate(10, ['*'], 'page', $page);
        } catch (\Throwable $th) {
            $output['msg']     = $th->getMessage() . ' line' . $th->getLine() . ' file' . $th->getFile();
            $output['status']  = false;
            $output['code']    = 500;
        }
        return response()->json($output, $output['code']);
    }

    public function getComplements()
    {
        $output['status'] = true;
        $output['code']   = 200;
        $output['msg']    = 'usuarios de creacion';
        $output['users']  = User::all();

        return response()->json($output, $output['code']);
    }


    public function create(Request $request)
    {

    }


    public function store(Request $request)
    {
        $output['status'] = true;
        $output['code']   = 200;
        $output['msg']     = 'Product created';
        try {
            $validator =  Product::validator($request);

            if ($validator->fails()) {
                $output['status']  = false;
                $output['code']    = 400;
                $output['msg']     = $validator->errors()->first();
                return response()->json($output, $output['code']);
            }
            $product = new Product();
            $product->name = $request->input('name');
            $product->price = $request->input('price');
            $product->stock = $request->input('stock');
            $product->status = 1;
            $product->user_creator = Auth::id();
            $product->user_last_update = Auth::id();
            $product->save();

        } catch (\Throwable $th) {
            $output['msg']     = $th->getMessage() . ' line' . $th->getLine() . ' file' . $th->getFile();
            $output['status']  = false;
            $output['code']    = 500;
        }
        return response()->json($output, $output['code']);
    }


    public function show($id)
    {
        $output['status'] = true;
        $output['code']  = 200;
        $output['msg']   = 'Product Detail';

        $product =  Product::with([
            'CreatedBy' => function ($query) {
                $query->select('id', 'name');
            },
            'UpdatedBy' => function ($query) {
                $query->select('id', 'name');
            }
        ])->where('id', $id)->first();

        $output['product'] = $product;
        return response()->json($output, $output['code']);
    }



    public function update(Request $request, $id)
    {
        $output['status'] = true;
        $output['code']  = 200;
        $output['msg'] = 'Product update ok';
        try {
            $validator =  Product::validator($request);
            if ($validator->fails()) {
                $output['status']  = false;
                $output['code']    = 400;
                $output['msg']     = $validator->errors()->first();
            }

            $product = Product::where('id', $id)->first();
            $product->name = $request->name;
            $product->price = $request->price;
            $product->status = 1;
            $product->user_last_update = Auth::id();
            $product->stock = $request->stock;
            $product->save();

        } catch (\Throwable $th) {
            $output['msg'] = $th->getMessage() . ' line' . $th->getLine() . ' file' . $th->getFile();
            $output['status']  = false;
            $output['code']    = 500;
        }
        return response()->json($output, $output['code']);
    }


    public function destroy($id)
    {
        try {
        $output['status'] = true;
        $output['code']  = 200;
        $output['msg'] = 'Product delete ok';

        $product = Product::where('id', $id)->first();
        $product->delete();

        } catch (\Throwable $th) {
            $output['msg']     = $th->getMessage() . ' line' . $th->getLine() . ' file' . $th->getFile();
            $output['status']  = false;
            $output['code']    = 500;
        }
        return response()->json($output, $output['code']);
    }
}
