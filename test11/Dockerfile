FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y \
        nodejs \
    && rm -rf /var/lib/apt/lists/*

RUN npm install -g yarn
WORKDIR /src
COPY ["test11/test11.csproj", "test11/"]
RUN dotnet restore "test11/test11.csproj"
COPY . .
WORKDIR "/src/test11"
RUN dotnet build "test11.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "test11.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "test11.dll"]
