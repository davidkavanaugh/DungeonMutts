using System;
using System.Collections.Generic;

interface IHero
{
    ActionResponse Attack(int LevelNumber, string username);
    string Spell();
    string Heal();
}