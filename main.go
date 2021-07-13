package main

import (
	"go_auth/database"
	"go_auth/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	database.Connect()

	app := fiber.New()

	// CORS are important in order to receive requests from other places, for e.g. your frontend at different server
	app.Use(cors.New(cors.Config{
		AllowCredentials: true, // so that frontend can receive and send the Http-only cookie
	}))

	routes.Setup(app)

	app.Listen(":8000")
}
