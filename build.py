from pathlib import Path
if __name__ == "__main__":
    BASE_FILE = "toupiti_base.js"
    FS_FILE  = ".shader.min.fs"
    MS_FILE = ".shader.music.min.fs"
    OUT_FILE_PATH = ".toupiti.fs.js"
    with open(BASE_FILE,"r") as f:
        html = f.read()
    with open(FS_FILE,"r") as f:
        fs = f.read()
    fs = fs.replace('\n','\\n')

    with open(MS_FILE,"r") as f:
        ms = f.read()
    ms = ms.replace('\n','\\n')
    html=html.replace("#FS#",fs)
    html=html.replace("#MS#",ms)
    with open(OUT_FILE_PATH,"w") as f:
        f.write(html)
