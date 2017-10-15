const fs = require('fs')
const args = {
  '-h': displayHelp,
  '-r': readFile
}

function displayHelp () {
  console.log('Arguments processor:', args)
}

function readFile (file) {
  if (file && file.length) {
    console.log('Reading: ', file)
    console.time('read')
    const stream = fs.createReadStream(file)
    stream.on('end', function () {
      console.timeEnd('read')
    })
    stream.pipe(process.stdout)
  } else {
    console.error('A file must be provided with the -r option')
    process.exit(1)
  }
}

if (process.argv.length > 0) {
  process.argv.forEach(function (arg, index) {
    const argument = args[arg]
    if (argument && typeof argument === 'function') {
      argument.apply(this, process.argv.slice(index + 1))
    }
  })
}