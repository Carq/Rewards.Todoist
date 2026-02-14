using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rewards.Todoist.Domain.Storage.Migrations
{
    /// <inheritdoc />
    public partial class IdLongToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "CompletedTasks",
                type: "TEXT",
                maxLength: 32,
                nullable: false,
                oldClrType: typeof(long),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "CompletedTasks",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldMaxLength: 32)
                .Annotation("Sqlite:Autoincrement", true);
        }
    }
}
