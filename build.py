from pathlib import Path
if __name__ == "__main__":
    BASE_FILE = "toupiti_base.js"
    FS_FILE  = ".shader.min.fs"
    OUT_FILE_PATH = ".toupiti.fs.js"
    with open(BASE_FILE,"r") as f:
        html = f.read()
    with open(FS_FILE,"r") as f:
        js = f.read()
    js = js.replace('\n','\\n')
    html=html.replace("#FS#",js)

    with open(OUT_FILE_PATH,"w") as f:
        f.write(html)
