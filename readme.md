Install with `npm install`

Requires emsdk 1.39.20 for Rust complation with emscripten:
```sh
wget https://github.com/emscripten-core/emsdk/archive/refs/tags/1.39.20.zip
7z x 1.39.20.zip 
cd emsdk-1.39.20/
./emsdk install latest
./emsdk activate latest
```

Rust support was installed on the server using rustup:
```sh
rustup toolchain add stable
rustup target add asmjs-unknown-emscripten --toolchain stable
rustup target add wasm32-unknown-emscripten --toolchain stable
```

I added the following to `.bashrc` so the executables can easily run and be found by node
```sh
source "$HOME/.cargo/env"
source "/home/student/emsdk-1.39.20/emsdk_env.sh"
```