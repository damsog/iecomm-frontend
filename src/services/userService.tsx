import { User } from "@prisma/client";
import prisma from "../lib/prisma";
import { Encryptor } from "@/lib/encryptor";
import crypto from 'crypto';

export interface UserDataModel {
    username: string;
    email: string;
    password: string;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    mainPhoto: string | null | undefined;
}

export default class UserService {
    static async create(user: UserDataModel): Promise<User> {
        const userCreated = await prisma.user.create({
            data: {
                ...user
            }
        });

        return userCreated;
    }

    static async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany();
        return users;
    }

    static async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        return user;
    }

    static async genertateApiKey(id: string): Promise<User | null> {
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                apiKey: crypto.randomUUID()
            }
        });

        return user;
    }

    static async getByApiKey(apiKey: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                apiKey: apiKey
            }
        });

        return user;
    }

    static async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        return user;
    }

    static async update(id: string, user: UserDataModel): Promise<User> {
        if(user.password) {
            if(user.password.length < 8) {
                throw new Error("Password must be at least 8 characters long");
            }
            user.password = await Encryptor.encryptPassword(user.password);
        }

        const userUpdated = await prisma.user.update({
            where: {
                id
            },
            data: {
                ...user
            }
        });

        return userUpdated;
    }

    static async delete(id: string): Promise<User | null>{
        const userDeleted = await prisma.user.delete({
            where: {
                id
            }
        })
        return userDeleted;
    }
}