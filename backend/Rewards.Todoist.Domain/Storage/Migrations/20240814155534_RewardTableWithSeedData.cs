using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Rewards.Todoist.Domain.Storage.Migrations
{
    /// <inheritdoc />
    public partial class RewardTableWithSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Rewards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    RequiredGold = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rewards", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Rewards",
                columns: new[] { "Id", "Name", "RequiredGold" },
                values: new object[,]
                {
                    { 1, "Masaż - 10 minut", 2 },
                    { 2, "Masaż - 20 minut", 5 },
                    { 3, "Czas dla siebie - 1h", 6 },
                    { 4, "Czas dla siebie - 2h", 14 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Rewards");
        }
    }
}
