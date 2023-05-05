#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0-jammy-amd64 AS base
WORKDIR /app
EXPOSE 5000

FROM mcr.microsoft.com/dotnet/sdk:6.0-jammy-amd64 AS build
WORKDIR /src
COPY ["KassabNova.csproj", "./"]
RUN dotnet restore "KassabNova.csproj"
COPY . .
WORKDIR "/src/"
RUN dotnet build "KassabNova.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "KassabNova.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "KassabNova.dll"]
