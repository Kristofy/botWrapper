#pragma once

#include <vector>

int playerID;

int P;

struct Planet
{
    int x, y;
    int efficiency;
    int playerID;
    int population;
};

std::vector<Planet> planets;
std::vector<std::vector<int>> dist;

int tick;

int T;

struct Troop
{
    int playerID;
    int from, to;
    int count;
    int arrive;
};

std::vector<Troop> troops;
