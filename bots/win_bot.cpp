#include <iostream>
#include <vector>

#include "utility.hpp"
#include "data.hpp"

using namespace std;


vector<Troop> ownTroops;


void addTroops(int from, int to, int count) {
    ownTroops.push_back({playerID, from, to, count, tick + dist[from][to]});
    planets[from].population -= count;
}

bool ownPlanet(int planetID) {
    return planets[planetID].playerID == playerID;
}


void respond()
{   
    ownTroops.clear();

    // if we can capture a planet we send almost all of our units
    for (int p1 = 0; p1 < P; ++p1) {
        for (int p2 = 0; p2 < P; ++p2) {
            int armyCount = planets[p1].population - 1;
            if (ownPlanet(p1) && !ownPlanet(p2) && armyCount > planets[p2].population + dist[p1][p2]) {
                addTroops(p1, p2, armyCount);
            }
        }
    }
    cout << ownTroops.size() << endl;
    for (Troop t : ownTroops) {
        cout << t.from << ' ' << t.to << ' ' << t.count << endl;
    }
}


int main()
{
    greeting();
    initialize();
    while (readTick())
    {
        respond();
    }
}
