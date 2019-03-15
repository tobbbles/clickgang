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

	log.Fatal(srv.Start())
}
