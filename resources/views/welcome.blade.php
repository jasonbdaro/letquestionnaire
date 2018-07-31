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
            <div class="row">
                <div class="col-md">
                    <div class="card bg-primary text-white">
                        <div class="card-body">
                            <div class="text-center">LET Reviewer 2018</div>
                        </div>
                    </div>
                    <div class="card mt-1">
                        <ul class="list-group list-group-flush">
                            @foreach ($sections as $section)
                            <li class="list-group-item mt-2">
                                <a href="{{ url('section/'.$section->id) }}">
                                    {{ $section->name }}
                                    <div style="float:right">{{ $section->status }}</div>
                                </a>
                            </li>
                            @endforeach
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </body>    
</html>
