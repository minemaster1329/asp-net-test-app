using Microsoft.EntityFrameworkCore;
using test11;
using test11.Data;
using test11.Models;
using test11.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
});

// Adding database context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(
        $"Server=127.0.0.1;Port=5432;Database={builder.Configuration["test11:Database"]};User Id={builder.Configuration["test11:DatabaseUser"]};Password={builder.Configuration["test11:DatabasePassword"]};");
});

builder.Services.AddScoped<IRepository<Patient>, PatientRepository>();
builder.Services.AddScoped<IPatientService, PatientService>();

builder.Services.AddScoped<IRepository<Doctor>, DoctorRepository>();
builder.Services.AddScoped<IDoctorService, DoctorService>();

//Adding CORS policy
builder.Services.AddCors((options) =>
{
    options.AddPolicy("AllowCorsPolicy", builder =>
    {
        builder.WithOrigins("http://localhost:7228")
            .AllowAnyHeader()
            .AllowAnyHeader();
    });
});

var app = builder.Build();

app.UseCors("AllowCorsPolicy");

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    //SeedData.Initialize(services);
}

// Configure the HTTP request pipeline.
// adding exception handler page
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


// app.MapControllerRoute(
//     name: "default",
//     pattern: "{controller}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "api",
    pattern: "api/{controller}/{action}/{id?}"
);

app.MapFallbackToFile("index.html");
;

app.Run();