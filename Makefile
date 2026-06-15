shader_mini:
	.\shader_minifier.exe --preserve-externals  --format text shader.fs -o .shader.min.fs
mini: shader_mini
	python .\build.py
	 terser .\.toupiti.fs.js --compress 'arguments,booleans_as_integers,keep_fargs=false,drop_console,unsafe_math,passes=2,unsafe_arrows' --mangle 'toplevel' -o .min.js
build: mini
	jsexe -cb -bb -mb -ps .min.js out.html
