using System;
using System.Collections.Generic;

interface IHero
{
    ActionResponse Attack(int LevelNumber, string username);
    ActionResponse Spell(int LevelNumber, string username);
    ActionResponse Heal(int LevelNumber, string username, string target);
}