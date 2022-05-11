using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace test11.Migrations
{
    public partial class AddedPhoneFieldToPatient : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "Patients",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Phone",
                table: "Patients");
        }
    }
}
