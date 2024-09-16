using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Rewards.Todoist.Domain.Storage.Migrations
{
    /// <inheritdoc />
    public partial class ClaimedRewardsChangeColumnToDateOnly : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateOnly>(
                name: "ClaimedOn",
                table: "ClaimedRewards",
                type: "DATE",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "ClaimedOn",
                table: "ClaimedRewards",
                type: "datetime",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "DATE");
        }
    }
}
