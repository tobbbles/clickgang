# syntax=docker/dockerfile:experimental

FROM golang:1.12-alpine AS builder
RUN apk add --no-cache git
ADD . /build
WORKDIR /build
RUN --mount=type=cache,target=/go/pkg/mod/cache/ go build -o /build/clickgang .

FROM alpine:latest AS runner
WORKDIR /service
COPY --from=builder /build/clickgang /service/
ENTRYPOINT ["/service/clickgang"]
