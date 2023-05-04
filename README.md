# Toupiti
Homemade Small Framework to create JS 4k based on Fragment shaderand Sound Shader.

Used for the release The Vortex / ヴォルテックス at Sessions demoparty https://demozoo.org/productions/323521/

The 2 button click are there to avoid fullscreen message. First clikc to put in fullscreen, then wait, then another click to start


## Dependcies 
- terser : for js minification
- jsexe : for bundling everything as a png

## How to build
```
terser --compress --mangle -o toupiti.min.js toupiti
.\jsexe.exe -cb -mb -po toupiti.min.js toupiti.html 
```

## Improvement
- Yes, a lot to do I guess

## Reference
- Audio implementation reference : https://github.com/0b5vr/js-4k-test