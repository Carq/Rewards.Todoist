using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rewards.Todoist.Domain.Storage.Migrations
{
    /// <inheritdoc />
    public partial class ClaimedRewardsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClaimedRewards",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    PaidGold = table.Column<int>(type: "INTEGER", nullable: false),
                    ClaimedById = table.Column<long>(type: "INTEGER", nullable: false),
                    ClaimedOn = table.Column<DateTime>(type: "datetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClaimedRewards", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClaimedRewards_Users_ClaimedById",
                        column: x => x.ClaimedById,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClaimedRewards_ClaimedById",
                table: "ClaimedRewards",
                column: "ClaimedById");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClaimedRewards");
        }
    }
}
