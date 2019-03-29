# syntax=docker/dockerfile:experimental

FROM node:latest AS webpack
RUN npm install webpack -g
ADD . /build
WORKDIR /build
RUN npm install
RUN webpack

FROM golang:1.12-alpine AS builder
RUN apk add --no-cache git
ADD . /build
WORKDIR /build
RUN --mount=type=cache,target=/go/pkg/mod/cache/ go build -o /build/clickgang .

FROM alpine:latest AS runner
WORKDIR /service
COPY --from=webpack /build/ui /service/ui
COPY --from=builder /build/clickgang /service/
ENTRYPOINT ["/service/clickgang"]
