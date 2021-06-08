const path = require("path")
const express = require("express")
const app = express()
const fs = require("fs")
//
/* tslint:disable */
const pathToIndex = path.join(__dirname, "build/index.html")
console.log('pathToIndex: ', pathToIndex)
app.get("/", (req, res) => {
  const raw = fs.readFileSync(pathToIndex)
  const pageTitle = "Homepage - Welcome to the Homepage"
  console.log('raw',raw);
  const updated = raw.toString().replace("__PAGE_TITLE__", `${pageTitle}`)
  console.log('updated',updated);
  res.send(updated)
})
//
app.use(express.static(path.join(__dirname, "build")))
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "build/index.html"))
)
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})
/* tslint:enable */