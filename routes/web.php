<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use Illuminate\Http\Request;

Route::get('/', function () {
    $sections = App\Section::all();
    return view('welcome', ['sections' => $sections]);
});

$sections = App\Section::all();
foreach ($sections as $s) {
    Route::match(['get', 'post'], 'section/'.$s->id, function (Request $request) use ($s) {
        if ($request->isMethod('post')) {
            $params = $request->all();
            unset($params['_token']);
            foreach ($params as $key => $val) {
                App\Question::where('id', $key)->update(['m_a' => $val]);
            }
            return redirect()->back();
        }

        $ia = 0;
        $ic_a = 0;
        $i = 0;
        $questions = App\Question::where('s_id', $s->id)->get();
        foreach ($questions as $q) {
            $i++;
            if (!empty($q->m_a)) {
                $ia++;
                if ($q->m_a == $q->c_a) {
                    $ic_a++;
                    $i_c = true;
                } else {
                    $i_c = false;
                }
            } else {
                $i_c = null;
            }
    
            $data[] = [
                'n' => $i,
                'id' => $q->id,
                'q' => $q->q,
                'o' => [
                    'a' => $q->a,
                    'b' => $q->b,
                    'c' => $q->c,
                    'd' => $q->d,
                ],
                'c_a' => $q->c_a,
                'm_a' => $q->m_a,
                'i_c' => $i_c,
            ];
        }
        $iq_l = count($questions) - $ia;
        $info = [
            'ia' => $ia,
            'ic_a' => $ic_a,
            'iq_l' => $iq_l,
            't' => $s->name,
            'id' => $s->id,
        ];
        App\Section::where('id', $s->id)->update(['status' => $ic_a.'/'.$ia.' ('.$iq_l.' left)']);

        return view('home', ['data' => $data, 'info' => $info]);
    });
}

Route::get('reset/{id}', function ($id) {
    App\Question::where('s_id', $id)->update(['m_a' => null]);
    App\Section::where('id', $id)->update(['status' => null]);
    
    return redirect()->back();
});

Route::match(['get', 'post'], 'add', function (Request $request) {
    if ($request->isMethod('post')) {
        $sc = $request->input('sc');
        $qu = json_decode($request->input('qu'));

        $section = App\Section::create(['name' => $sc]);

        foreach ($qu as $q) {
            App\Question::create([
                's_id' => $section->id,
                'q' => $q->q,
                'a' => $q->a,
                'b' => $q->b,
                'c' => $q->c,
                'd' => $q->d,
                'c_a' => $q->c_a
            ]);
        }

        return $section->id;
    }
    return view('add');
});

Route::get('listing', function () {
    $sections = App\Section::all();
    return response()->json($sections);
});

Route::get('sec', function (Request $request) {
    $id = $request->input('id');
    $questions = App\Question::where('s_id', $id)->get();
    return response()->json($questions);
});

Route::post('update', function (Request $request) {
    $id = $request->input('sid');
    $params = $request->input('data');
    $data = json_decode($params);
    foreach ($data as $d) {
        if (isset($d->sc)) {
            App\Section::where('id', $d->sid)->update(['name' => $d->sc]);
        } else if (isset($d->dlt)) {
            $dd = App\Question::findOrFail($d->dlt);
            $dd->delete();
        } else if (isset($d->id)) {
            unset($d->uid);
            App\Question::where('id', $d->id)->update((array)$d);
        } else {
            unset($d->uid);
            $d = (array)$d;
            $d['s_id'] = (int)$id;
            App\Question::create($d);
        }
    }
    return 1;
});

Route::post('delete', function (Request $request) {
    $id = $request->input('sid');
    App\Question::where('s_id', $id)->delete();
    $sec = App\Section::findOrFail($id);
    $sec->delete();
    return 1;
});