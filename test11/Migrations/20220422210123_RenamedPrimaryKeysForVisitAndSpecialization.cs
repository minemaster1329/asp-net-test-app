using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace test11.Migrations
{
    public partial class RenamedPrimaryKeysForVisitAndSpecialization : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DoctorPesel",
                table: "Visit");

            migrationBuilder.DropColumn(
                name: "PatientPesel",
                table: "Visit");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Visit",
                newName: "VisitId");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Specialization",
                newName: "SpecializationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "VisitId",
                table: "Visit",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "SpecializationId",
                table: "Specialization",
                newName: "Id");

            migrationBuilder.AddColumn<string>(
                name: "DoctorPesel",
                table: "Visit",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PatientPesel",
                table: "Visit",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
