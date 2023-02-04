import express from 'express';

let viewEngine = (app) => {
    app.use(express.static("./src/public"));
}
export default viewEngine;