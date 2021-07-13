package database

import (
	"go_auth/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Get connection variable in a global var to use it accross the app
var DB *gorm.DB

func Connect() {
	// database connection
	// refer https://github.com/go-sql-driver/mysql#dsn-data-source-name for details
	dsn := "host=localhost user=postgres password=sameer dbname=my_auth port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	connection, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	// db, err := gorm.Open(mysql.Open(dsn:"root:Sameer123!@#@/my_auth"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	DB = connection

	connection.AutoMigrate(&models.User{})
}
