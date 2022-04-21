using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace test11.Migrations
{
    public partial class ChangePatientAndDoctorPrimaryKeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Visit_Doctor_DoctorPesel",
                table: "Visit");

            migrationBuilder.DropForeignKey(
                name: "FK_Visit_Patients_PatientPesel",
                table: "Visit");

            migrationBuilder.DropIndex(
                name: "IX_Visit_DoctorPesel",
                table: "Visit");

            migrationBuilder.DropIndex(
                name: "IX_Visit_PatientPesel",
                table: "Visit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Patients",
                table: "Patients");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Doctor",
                table: "Doctor");

            migrationBuilder.AddColumn<int>(
                name: "DoctorId",
                table: "Visit",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PatientId",
                table: "Visit",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PatientId",
                table: "Patients",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "DoctorId",
                table: "Doctor",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Patients",
                table: "Patients",
                column: "PatientId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Doctor",
                table: "Doctor",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_Visit_DoctorId",
                table: "Visit",
                column: "DoctorId");

            migrationBuilder.CreateIndex(
                name: "IX_Visit_PatientId",
                table: "Visit",
                column: "PatientId");

            migrationBuilder.AddForeignKey(
                name: "FK_Visit_Doctor_DoctorId",
                table: "Visit",
                column: "DoctorId",
                principalTable: "Doctor",
                principalColumn: "DoctorId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Visit_Patients_PatientId",
                table: "Visit",
                column: "PatientId",
                principalTable: "Patients",
                principalColumn: "PatientId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Visit_Doctor_DoctorId",
                table: "Visit");

            migrationBuilder.DropForeignKey(
                name: "FK_Visit_Patients_PatientId",
                table: "Visit");

            migrationBuilder.DropIndex(
                name: "IX_Visit_DoctorId",
                table: "Visit");

            migrationBuilder.DropIndex(
                name: "IX_Visit_PatientId",
                table: "Visit");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Patients",
                table: "Patients");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Doctor",
                table: "Doctor");

            migrationBuilder.DropColumn(
                name: "DoctorId",
                table: "Visit");

            migrationBuilder.DropColumn(
                name: "PatientId",
                table: "Visit");

            migrationBuilder.DropColumn(
                name: "PatientId",
                table: "Patients");

            migrationBuilder.DropColumn(
                name: "DoctorId",
                table: "Doctor");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Patients",
                table: "Patients",
                column: "Pesel");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Doctor",
                table: "Doctor",
                column: "Pesel");

            migrationBuilder.CreateIndex(
                name: "IX_Visit_DoctorPesel",
                table: "Visit",
                column: "DoctorPesel");

            migrationBuilder.CreateIndex(
                name: "IX_Visit_PatientPesel",
                table: "Visit",
                column: "PatientPesel");

            migrationBuilder.AddForeignKey(
                name: "FK_Visit_Doctor_DoctorPesel",
                table: "Visit",
                column: "DoctorPesel",
                principalTable: "Doctor",
                principalColumn: "Pesel",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Visit_Patients_PatientPesel",
                table: "Visit",
                column: "PatientPesel",
                principalTable: "Patients",
                principalColumn: "Pesel",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
