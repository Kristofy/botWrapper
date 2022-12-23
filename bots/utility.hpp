#pragma once

#include <iostream>

#include "data.hpp"

// respond to the first server message
void greeting()
{
    std::string greeting;
    std::cin >> greeting;
    std::cout << "OK" << std::endl;
}

// read and store initial parameters
void initialize()
{
    std::cin >> playerID >> P;

    planets.resize(P);
    for (int i = 0; i < P; ++i)
    {
        std::cin >> planets[i].x >> planets[i].y >> planets[i].efficiency;
    }

    dist.resize(P, std::vector<int>(P));
    for (int i = 0; i < P; ++i)
    {
        for (int j = 0; j < P; ++j)
        {
            std::cin >> dist[i][j];
        }
    }
}

// read tick data
bool readTick()
{
    std::cin >> tick;
    if (tick == -1)
    {
        return false;
    }

    int planetID;
    for (int i = 0; i < P; ++i)
    {
        std::cin >> planetID;
        std::cin >> planets[planetID].playerID >> planets[planetID].population;
    }

    std::cin >> T;

    troops.resize(T);
    for (int i = 0; i < T; ++i)
    {
        std::cin >> troops[i].playerID >> troops[i].from >> troops[i].to >> troops[i].count >> troops[i].arrive;
    }

    return true;
}
