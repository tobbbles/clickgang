package main

import (
	"clickgang/server"
	"log"
)

func main() {
	srv, err := server.New("localhost:3117")
	if err != nil {
		log.Fatal(err)
	}

    srv2, err := server.NewWeb("localhost:80")
	if err != nil {
		log.Fatal(err)
	}

	go log.Fatal(srv.Start())
	go log.Fatal(srv2.Start())
}
