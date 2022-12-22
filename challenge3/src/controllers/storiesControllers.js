import express from "express";

export const home = (req, res) => res.send("<h1>home</h1>");

export const trending = (req, res) => res.send("trending");

export const newStory = (req, res) => res.send("newStory");

export const story = (req, res) => res.send("story");

export const edit = (req, res) => res.send("edit-story");

export const deleteStory = (req, res) => res.send("delete-story");
