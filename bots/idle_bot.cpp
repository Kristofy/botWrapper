#include <iostream>

#include "utility.hpp"
#include "data.hpp"

using namespace std;


void respond()
{
    cout << 0 << endl;
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
