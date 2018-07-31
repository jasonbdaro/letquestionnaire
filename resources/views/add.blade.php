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
        <div id="root" class="container">            
        </div>
    </body>
    <script>
        window.basePath = "{{ url('/') }}";
    </script>
    <script src="{{ asset('js/app.js') }}"></script>
</html>
