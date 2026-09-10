import { type ErrorRequestHandler } from 'express';
import { appendFileSync } from 'node:fs';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV !== 'development') {
        const errorDetails = err instanceof Error ? err.stack : String(err);
        appendFileSync('error.log', `[${new Date().toISOString()}] ${errorDetails}\n`);
    }
    let errorMessage = 'Internal server error';
    let statusCode = 500;

    if (err instanceof Error) {
        if (err.cause && typeof err.cause === 'object' && 'status' in err.cause) {
            statusCode = err.cause.status as number;
        }
        errorMessage = err.message;
    }

    res.status(statusCode).json({ error: errorMessage });
};

export default errorHandler;
// error.log würde im Fehlerfall unter Projektverzeichnis epress-error-handling erstellt werden.

//+++++++++urprünglicheVersionMitAuskommentierterAenderung++++++++++++++++++++++++++++++
// import { type ErrorRequestHandler } from 'express';
// //import { appendFileSync } from 'node:fs';

// const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
//  //   if (process.env.NODE_ENV !== 'development') {
//  //       const errorDetails = err instanceof Error ? err.stack : String(err);
//  //       appendFileSync('error.log', `[${new Date().toISOString()}] ${errorDetails}\n`);
//  //   }
//     let errorMessage = 'Internal server error';
//     let statusCode = 500;

//     if (err instanceof Error) {
//         if (err.cause && typeof err.cause === 'object' && 'status' in err.cause) {
//             statusCode = err.cause.status as number;
//         }
//         errorMessage = err.message;
//     }

//     res.status(statusCode).json({ error: errorMessage });
// };

// export default errorHandler;

//In Kosole wird dies geprüft:
//  pwd && if [[ -f error.log ]]; then printf '%s\n' "$PWD/error.log"; else printf '%s\n' 'Noch nicht angelegt'; fi
