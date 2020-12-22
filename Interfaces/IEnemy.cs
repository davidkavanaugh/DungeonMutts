using System;
using System.Collections.Generic;

interface IEnemy
{
    ActionResponse Attack(int LevelNumber, string username);
}