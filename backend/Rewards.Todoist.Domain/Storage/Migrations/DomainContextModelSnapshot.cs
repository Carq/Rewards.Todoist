﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Rewards.Todoist.Domain.Storage;

#nullable disable

namespace Rewards.Todoist.Domain.Storage.Migrations
{
    [DbContext(typeof(DomainContext))]
    partial class DomainContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.2");

            modelBuilder.Entity("Rewards.Todoist.Domain.Projects.Entities.CompletedTaskEntity", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CompletedAt")
                        .HasColumnType("datetime");

                    b.Property<long>("CompletedById")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Labels")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<string>("ProjectId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("CompletedById");

                    b.ToTable("CompletedTasks", (string)null);
                });

            modelBuilder.Entity("Rewards.Todoist.Domain.Rewards.Entities.RewardEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<int>("RequiredGold")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Rewards", (string)null);

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Masaż - 10 minut",
                            RequiredGold = 2
                        },
                        new
                        {
                            Id = 2,
                            Name = "Masaż - 20 minut",
                            RequiredGold = 5
                        },
                        new
                        {
                            Id = 3,
                            Name = "Czas dla siebie - 1h",
                            RequiredGold = 6
                        },
                        new
                        {
                            Id = 4,
                            Name = "Czas dla siebie - 2h",
                            RequiredGold = 14
                        });
                });

            modelBuilder.Entity("Rewards.Todoist.Domain.Users.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<string>("TodoistAccessToken")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Users", (string)null);
                });

            modelBuilder.Entity("Rewards.Todoist.Domain.Projects.Entities.CompletedTaskEntity", b =>
                {
                    b.HasOne("Rewards.Todoist.Domain.Users.User", "CompletedBy")
                        .WithMany()
                        .HasForeignKey("CompletedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CompletedBy");
                });
#pragma warning restore 612, 618
        }
    }
}
