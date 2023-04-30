var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/login");
const JWT = require("./util/JWT");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// TODO:设置中间件，token过期校验
app.use((req, res, next) => {
    // TODO:排除login相关的接口和路由，放行login
    if (req.url.includes("login")) {
        next();
        return;
    }
    // console.log("req.headers", req.headers);
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log("tokenX", typeof(token));
    // 如果token为undefined直接走else next();如果token为字符串"null"(前端request请求携带的字符串`Bearer ${token}`)，那么就会走if判断，合格就放行，不合格就给前端报错;
    if (token) {
        const payload = JWT.verify(token);
        if (payload) {
            // TODO:重新计算token过期时间
            const newToken = JWT.generate(
                {_id: payload.id, username: payload.username},
                "1h"
            );
            res.header("Authorization", newToken);
            next();
        } else {
            res.status(401).send({errCode: -1, errInfo: "token过期"});
        }
    } else {
        next();
    }
});

app.use("/", indexRouter);
app.use("/api", usersRouter);
app.use("/login", loginRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
