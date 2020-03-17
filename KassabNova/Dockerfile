#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["KassabNova.csproj", "./"]
RUN dotnet restore -r linux-arm64 "KassabNova.csproj"

COPY . .
WORKDIR "/src/"
RUN dotnet build "KassabNova.csproj" -c Release -o /app/build -r linux-arm64

FROM build AS publish
RUN dotnet publish "KassabNova.csproj" -c Release -o /app/publish -r linux-arm64

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "KassabNova.dll"]
