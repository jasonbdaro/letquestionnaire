<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>LET Reviewer 2018</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.2/css/bootstrap.min.css" integrity="sha384-Smlep5jCw/wG7hdkwQ/Z5nLIefveQRIY9nfy6xoR1uRYBtpZgI6339F5dgvm/e9B" crossorigin="anonymous">
        <link rel="stylesheet" href="{{ asset('css/app.css') }}">        
    </head>
    <body>
        <div class="container-fluid">
            <div class="row no-gutters">
                <div class="col-md">
                    <form action="{{ url('/section/'.$info['id']) }}" method="post">
                        {{ csrf_field() }}
                        <div class="card bg-primary text-white">
                            <div class="card-body">
                                <div class="text-center">{{ $info['t'] }}</div>
                            </div>
                        </div>
                        @if ($info['ia'])
                        <div class="alert alert-info mt-1 text-center" role="alert">
                            {{ $info['ic_a'] }} / {{ $info['ia'] }} correct answers
                            @if ($info['iq_l'])
                                ({{ $info['iq_l'] }} question/s left)
                            @endif
                        </div>
                        @endif
                        <div class="card {{ empty($info['ia']) ? 'mt-1' : '' }}">
                            <ul class="list-group list-group-flush">
                                @foreach ($data as $d)
                                <li class="list-group-item mt-2">
                                    <p>{{ $d['n'].'. '.$d['q'] }}</p>
                                    <div class="row">
                                        @foreach ($d['o'] as $k => $o)
                                            @if ($d['m_a'])
                                                @if ($d['i_c'] && $k == $d['c_a'])
                                                <div class="col-md-3">
                                                    <div class="custom-control custom-radio">
                                                        <input type="radio" id="{{ 'q-'.$d['n'].'-'.$k }}" value="{{ $k }}" name="{{ $d['id'] }}" class="custom-control-input" checked>
                                                        <label class="custom-control-label text-success" for="{{ 'q-'.$d['n'].'-'.$k }}">{{ $k.'. '.$o }}</label>
                                                    </div>
                                                </div>
                                                @else
                                                    @if ($d['m_a'] == $k)
                                                    <div class="col-md-3">
                                                        <div class="custom-control custom-radio">
                                                            <input type="radio" id="{{ 'q-'.$d['n'].'-'.$k }}" value="{{ $k }}" name="{{ $d['id'] }}" class="custom-control-input" checked>
                                                            <label class="custom-control-label text-danger" for="{{ 'q-'.$d['n'].'-'.$k }}">{{ $k.'. '.$o }}</label>
                                                        </div>
                                                    </div>
                                                    @elseif ($d['c_a'] == $k)
                                                    <div class="col-md-3">
                                                        <div class="custom-control custom-radio">
                                                            <input type="radio" id="{{ 'q-'.$d['n'].'-'.$k }}" value="{{ $k }}" name="{{ $d['id'] }}" class="custom-control-input">
                                                            <label class="custom-control-label text-success" for="{{ 'q-'.$d['n'].'-'.$k }}">{{ $k.'. '.$o }}</label>
                                                        </div>
                                                    </div>
                                                    @else
                                                    <div class="col-md-3">
                                                        <div class="custom-control custom-radio">
                                                            <input type="radio" id="{{ 'q-'.$d['n'].'-'.$k }}" value="{{ $k }}" name="{{ $d['id'] }}" class="custom-control-input">
                                                            <label class="custom-control-label" for="{{ 'q-'.$d['n'].'-'.$k }}">{{ $k.'. '.$o }}</label>
                                                        </div>
                                                    </div>
                                                    @endif
                                                @endif
                                            @else
                                            <div class="col-md-3">
                                                <div class="custom-control custom-radio">
                                                    <input type="radio" id="{{ 'q-'.$d['n'].'-'.$k }}" value="{{ $k }}" name="{{ $d['id'] }}" class="custom-control-input">
                                                    <label class="custom-control-label" for="{{ 'q-'.$d['n'].'-'.$k }}">{{ $k.'. '.$o }}</label>
                                                </div>
                                            </div>
                                            @endif
                                        @endforeach
                                    </div>
                                </li>
                                @endforeach
                            </ul>
                        </div>
                        <button type="submit" class="btn btn-primary btn-block mt-2 mb-2">Submit answers</button>
                        <button type="button" id="reset-answer" class="btn btn-danger btn-block mt-2 mb-2">Reset all answers</button>
                        <a href="{{ url('/') }}" class="btn btn-info btn-block mt-2 mb-2">Menu</a>
                    </form>
                </div>
            </div>
        </div>
    </body>
    <script>
        var btn = document.getElementById('reset-answer');
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to reset your answers?')) {
                window.location.href = "{{ url('reset/'.$info['id']) }}";                
            }
        });
    </script>
</html>