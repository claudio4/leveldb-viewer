# LevelDB Viewer
This is just a wrapper around [Pcan's leveldb viewer](https://github.com/pcan/leveldb-viewer) so it can be readily used with just a command a no extra codding.

You can open any leveldb folder with 
```bash
node index.mjs /path/to/leveldb/folder
```

That will offer the webUI at port 3000. The port can be changed with the `NODE_PORT` environment variable.

It can be also be used via Docker/Podman trough an image at ghcr.io/claudio4/leveldb-viewer.
```bash
docker run --rm -p 3000:3000 -v /path/to/leveldb/folder:/data ghcr.io/claudio4/leveldb-viewer /data
```
